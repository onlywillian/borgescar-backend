import { Request, Response } from "express";
import schedulingService from "../../services/schedulingService";
import IScheduling from "../../interfaces/schedulingInterface";

export default class UserController {
  private req: Request;
  private res: Response;
  private schedulingService: schedulingService;

  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;
    this.schedulingService = new schedulingService();
  }

  public async getAllSchedules() {
    const schedules = await this.schedulingService.getAllSchedules();

    return schedules;
  }

  public async getScheduleById() {
    const { id } = this.req.params;

    const schedule = await this.schedulingService.getScheduleById(id);

    if (!schedule)
      return this.res.status(404).send({ Error: "Usuário não encontrado" });

    return this.res.status(200).send({ schedule });
  }

  public async createSchedule() {
    const scheduleData: IScheduling = { ...this.req.body };

    const schedule = await this.schedulingService.createSchedule(scheduleData);

    return this.res.status(200).send({ schedule });
  }

  public async updateSchedule() {
    const scheduleData = this.req.body;

    const schedule = await this.schedulingService.updateScheduleById(
      scheduleData.id,
      scheduleData
    );

    return this.res.status(200).send({ schedule });
  }

  public async deleteSchedule() {
    const { id } = this.req.body;

    const schedule = await this.schedulingService.deleteScheduleById(id);

    return this.res.status(200).send({ schedule });
  }
}
