import CopyForm from "../../../src/creational/prototype/CopyForm";
import Form from "../../../src/creational/prototype/Form";
import { FormRepositoryMemory } from "../../../src/creational/prototype/FormRepository";

test("Deve copiar um formulário", async function () {
  const formRepository = new FormRepositoryMemory();
  const form = new Form("1", "Marketing", "Leads");
  form.addField("text", "name");
  form.addField("text", "email");
  await formRepository.save(form);
  const copyForm = new CopyForm(formRepository);
  const input = {
    fromFormId: "1",
    newFormId: "2",
    newCategory: "Marketing",
    newDescription: "Leads v2",
  };
  await copyForm.execute(input);
  const newForm = await formRepository.getById("2");
  expect(newForm.fields).toHaveLength(2);
  expect(newForm.category).toEqual("Marketing");
  expect(newForm.description).toEqual("Leads v2");
  expect(newForm.fields.at(0)?.title).toEqual("name");
  expect(newForm.fields.at(1)?.title).toEqual("email");
});
