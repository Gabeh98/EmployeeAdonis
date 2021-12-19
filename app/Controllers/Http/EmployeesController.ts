import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Employee from 'App/Models/Employee'

export default class EmployeesController {
  public async index({}: HttpContextContract) {
    const employees = await Employee.all()
    return employees
  }

  public async store({ request }: HttpContextContract) {
    const data = request.only(['name','email','password','cpf'])
    const employee = await Employee.create(data)
    return employee
  }

  // public async store({}: HttpContextContract) {}

  public async show({ params }: HttpContextContract) {
    const employee = await Employee.findOrFail(params.id)
    return employee
  }

  public async update({request,params}: HttpContextContract) {
    const employee = await Employee.findOrFail(params.id)
    const data = request.only(['name','email','password','cpf'])
    employee.merge(data)
    await employee.save()

    return employee
  }

  // public async update({}: HttpContextContract) {}

  public async destroy({params}: HttpContextContract) {
    const employee = await Employee.findOrFail(params.id)
    await employee.delete();
  }
}
