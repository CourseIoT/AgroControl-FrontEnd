export class AgriculturalProcess {
  id: number;
  userId: number;
  plantType: string;
  startDate: Date | null;
  endDate: Date | null
  isFinished: boolean;
  details:    string;
  constructor(agriculturalProcedure:{
    id?: number;
    userId?: number;
    plantType?: string;
    startDate?: Date;
    endDate?: Date;
    isFinished?: boolean;
    details?: string;
  }) {
    this.id = agriculturalProcedure.id || 0;
    this.userId = agriculturalProcedure.userId || 0;
    this.plantType = agriculturalProcedure.plantType || "";
    this.startDate = agriculturalProcedure.startDate || null;
    this.endDate = agriculturalProcedure.endDate || null;
    this.isFinished = agriculturalProcedure.isFinished || false;
    this.details = agriculturalProcedure.details || "";
  }
}
