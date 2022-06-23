import Project from '../../models/Project'
import { IProject, RProject } from '../../interfaces/IProject'
import { ApiError } from '../../errors/ApiError'

type Updates = {
    name ? : string;
    workflow ? : string[];
}

export const create = async (reqProject: RProject): Promise < IProject > => {
    reqProject.workflow = reqProject.workflow.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
    })
    const project: IProject = await Project.create(reqProject)

    return project
}

export const findById = async (id: string): Promise < IProject > => {
    const project: IProject = await Project.findById(id)
    if (!project || project.deleted == true) throw ApiError.notFound('no project found')
    return project
}

export const searchProject = async ({ name, limit = 10, skip = 0 }) => {
    let pipe = [];

    if (name)
        pipe.push({ $match: { $text: { $search: name } } });

    pipe.push({ $match: { deleted: false } });
    pipe.push({ $skip: Number(skip) });
    pipe.push({ $limit: Number(limit) });

    return await Project.aggregate(pipe)

}

export const deleteById = async (id: string): Promise < IProject > => {
    const project = await Project.findOne({ _id: id });
    if (!project || project.deleted == true) {
        throw ApiError.notFound('no project found')
    }
    await project.delete()
    return
}

export const update = async ({ id, name, workflow }): Promise < IProject > => {
    let updates: Updates = {}
    if (name)
        updates.name = name
    if (workflow)
        updates.workflow = workflow.filter(function(elem, index, self) {
            return index === self.indexOf(elem);
        })

    try {
        const project: IProject = await Project.findOneAndUpdate({ _id: id }, updates, { new: true })
        return project
    } catch (err) {
        throw ApiError.serverError('could not update the project')
    }
}