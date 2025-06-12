import { AverageRepositoryDatabase } from "../../../src/behavioral/mediator/AverageRepository";
import CalculateAverage from "../../../src/behavioral/mediator/CalculateAverage";
import GetAverage from "../../../src/behavioral/mediator/GetAverage";
import { GradeRepositoryDatabase } from "../../../src/behavioral/mediator/GradeRepository";
import Mediator from "../../../src/behavioral/mediator/Mediator";
import SaveGrade from "../../../src/behavioral/mediator/SaveGrade";
import SaveGradeMediator from "../../../src/behavioral/mediator/SaveGradeMediator";

test("Deve salvar a nota do aluno e calcular a média", async function () {
  const studentId = Math.round(Math.random() * 1000000);
  const gradeRepository = new GradeRepositoryDatabase();
  const averageRepository = new AverageRepositoryDatabase();
  const calculateAverage = new CalculateAverage(
    gradeRepository,
    averageRepository
  );
  const saveGrade = new SaveGrade(gradeRepository, calculateAverage);
  const inputP1 = {
    studentId,
    exam: "P1",
    value: 10,
  };
  await saveGrade.execute(inputP1);
  const inputP2 = {
    studentId,
    exam: "P2",
    value: 9,
  };
  await saveGrade.execute(inputP2);
  const inputP3 = {
    studentId,
    exam: "P3",
    value: 8,
  };
  await saveGrade.execute(inputP3);
  const getAverage = new GetAverage(averageRepository);
  const output = await getAverage.execute(studentId);
  expect(output.average).toBe(9);
});

test("Deve salvar a nota do aluno e calcular a média", async function () {
  const studentId = Math.round(Math.random() * 1000000);
  const gradeRepository = new GradeRepositoryDatabase();
  const averageRepository = new AverageRepositoryDatabase();
  const calculateAverage = new CalculateAverage(
    gradeRepository,
    averageRepository
  );
  const mediator = new Mediator();
  mediator.register("gradeSaved", async function (data: any) {
    await calculateAverage.execute(data.studentId);
  });
  const saveGrade = new SaveGradeMediator(gradeRepository, mediator);
  const inputP1 = {
    studentId,
    exam: "P1",
    value: 10,
  };
  await saveGrade.execute(inputP1);
  const inputP2 = {
    studentId,
    exam: "P2",
    value: 9,
  };
  await saveGrade.execute(inputP2);
  const inputP3 = {
    studentId,
    exam: "P3",
    value: 8,
  };
  await saveGrade.execute(inputP3);
  const getAverage = new GetAverage(averageRepository);
  const output = await getAverage.execute(studentId);
  expect(output.average).toBe(9);
});
