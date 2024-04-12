import IScheduling from "../interfaces/schedulingInterface";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class schedulingService {
  public async getAllSchedules() {
    const schedules = await prisma.schedules.findMany();

    return schedules;
  }

  public async getScheduleById(id: string) {
    const schedule = await prisma.schedules.findFirst({
      where: {
        id: id,
      },
    });

    return schedule;
  }

  public async createSchedule(scheduleData: IScheduling) {
    const schedule = await prisma.schedules.findFirst({
      where: {
        id: scheduleData.id,
      },
    });

    const newSchedule = await prisma.schedules.create({
      data: scheduleData,
    });

    return newSchedule;
  }

  public async updateScheduleById(id: string, schedule: IScheduling) {
    const updatedSchedule = await prisma.schedules.update({
      where: {
        id: id,
      },
      data: schedule,
    });

    return updatedSchedule;
  }

  public async deleteScheduleById(id: string) {
    const deletedSchedule = await prisma.schedules.delete({
      where: {
        id: id,
      },
    });

    return deletedSchedule;
  }
}
