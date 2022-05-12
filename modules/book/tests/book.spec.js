/*import { sum, isEven, fullName, create, findById } from "../service.js"
import { connect } from '../../../core/mongoMemoryServer.js'

describe('admin tests', () => {
    let number
    let admin = null
    beforeAll(async () => {
        await connect()
        number = 10
        jasmine.addMatchers({
            toBeYoung: () => {
                return {
                    compare: (actual, expected) => {
                        const result = {}
                        result.pass = actual > 15 && actual < 40
                        result.message = 'is not young'

                        return result
                    }
                }
            }
        })
    })

    afterAll(() => {
        // destructor
    })

    beforeEach(() => {
        number += 10
    })

    it('sum 2 numbers', () => {
        // expect(sum(5, 7)).not.toBe(12)
        expect(sum(5, 7)).toBe(12)
        expect(sum(-5, 7)).toBe(2)
        expect((number)).toBe(20)
    })

    it('built in matchers', () => {
        expect(true).toBe(true)
        expect(10).toBeGreaterThan(5)
        expect(NaN).toBeNaN()
        expect((number)).toBe(30)
    })

    it('isEven', () => {
        expect(isEven(2)).toBe(true)
        const arr = [1, 2, 3, 10, 5]
        expect(arr).toContain(10)
        expect(arr).toHaveSize(5)
    })

    it('custom matcher', () => {
        expect(20).toBeYoung()
    })

    it('custom matcher', () => {
        expect(20).toBe(20)
    })

    it('get full name', () => {
        // spyOn(service, 'isEven').and.returnValue(false)
        const user1 = ['Zaid', 'Hanoun']
        const user2 = ['Zaid', 'Jamal', 'Hanoun']
        const user3 = ['Zaid', undefined, 'Hanoun']
        const user4 = []
        const user5 = undefined

        expect(fullName(user1)).toBe('Zaid Hanoun')
        expect(fullName(user2)).toBe('Zaid Jamal Hanoun')
        expect(fullName(user3)).toBe('Zaid Hanoun')
        expect(fullName(user4)).toBe('')

        try {
            fullName(user5)
        } catch (error) {
            expect(error.message).toBe('invalid argument')
        }
    })

    it('create admin', async () => {
        admin = await create({
            email: 'admin@example.com',
            password: '123',
            firstName: 'John',
            lastName: 'Doe',
            roles: []
        })
        expect(admin.email).toBe('admin@example.com')
        expect(admin.password).not.toBe('123')
        await expectAsync(create({
            email: 'admin@example.com',
            password: '123',
            firstName: 'John',
            lastName: 'Doe',
            roles: []
        })).toBeRejected()
        // try {
        //     await 
        // } catch (err) {
        //     expect(err.message).toBe('E11000 duplicate key error dup key: { : "admin@example.com" }')
        // }
    })

    it('find admin by id', async () => {
        const db_admin = await findById(admin._id)
        expect(db_admin.email).toBe('admin@example.com')
        expect(db_admin.password).not.toBe('123')
        expect(db_admin.fullName).toBe('John Doe')
    })
})*/