// src/services/scheduleService.ts
import { Schedule } from '@prisma/client';
import { CreateScheduleInput } from '../validators/scheduleValidator';
import { ScheduleRepository } from '../repositories/scheduleRepository';

export class ScheduleService {
	private scheduleRepository: ScheduleRepository;

	constructor() {
		this.scheduleRepository = new ScheduleRepository();
	}

	async createSchedule(data: CreateScheduleInput): Promise<Schedule> {
		try {
			return await this.scheduleRepository.create(data);
		} catch (error) {
			throw error;
		}
	}

	async getSchedules(): Promise<Schedule[]> {
		try {
			return await this.scheduleRepository.findAll();
		} catch (error) {
			throw error;
		}
	}

	async getScheduleById(id: string): Promise<Schedule | null> {
		try {
			return await this.scheduleRepository.findById(id);
		} catch (error) {
			throw error;
		}
	}

	async getSchedulesByOperationId(operationId: string): Promise<Schedule[]> {
		try {
			return await this.scheduleRepository.findByOperationId(operationId);
		} catch (error) {
			throw error;
		}
	}

	async updateSchedule(
		id: string,
		data: CreateScheduleInput,
	): Promise<Schedule | null> {
		try {
			return await this.scheduleRepository.update(id, data);
		} catch (error) {
			throw error;
		}
	}

	async deleteSchedule(id: string): Promise<Schedule | null> {
		try {
			return await this.scheduleRepository.delete(id);
		} catch (error) {
			throw error;
		}
	}
}
