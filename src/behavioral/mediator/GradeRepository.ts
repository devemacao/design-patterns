import pgp from "pg-promise";
import Grade from "./Grade";

export default interface GradeRepository {
  save(grade: Grade): Promise<void>;
  listByStudentId(studentId: number): Promise<Grade[]>;
}

export class GradeRepositoryDatabase implements GradeRepository {
  async save(grade: Grade): Promise<void> {
    const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
    await connection.query(
      "insert into design_patterns.grades (student_id, exam, value) values ($1, $2, $3)",
      [grade.studentId, grade.exam, grade.value]
    );
    await connection.$pool.end();
  }

  async listByStudentId(studentId: number): Promise<Grade[]> {
    const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
    const results = await connection.query(
      "select * from design_patterns.grades where student_id = $1",
      [studentId]
    );
    await connection.$pool.end();
    const grades: Grade[] = [];
    for (const result of results) {
      grades.push(
        new Grade(result.student_id, result.exam, parseFloat(result.value))
      );
    }
    return grades;
  }
}
