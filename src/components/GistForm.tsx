import { Form, Link } from "react-router-dom";
import FormGroup from "./FormGroup";

interface IGistForm {
  errors?: TGistFormErrors;
  defaultValues?: {
    description: string;
    name: string;
    content: string;
  };
  method: "get" | "post" | "put" | "patch" | "delete";
}

export type TGistFormErrors = {
  description?: string;
  name?: string;
  content?: string;
};
export function gistFormValidator({
  description,
  name,
  content,
}: {
  description: string;
  name: string;
  content: string;
}): TGistFormErrors {
  const errors: TGistFormErrors = {};

  if (description === "") {
    errors.description = "Required";
  }
  if (name === "") {
    errors.name = "Required";
  }
  if (content === "") {
    errors.content = "Required";
  }
  return errors;
}
function GistForm({ method, errors, defaultValues }: IGistForm) {
  return (
    <Form method={method} className='form'>
      <div className='form-row'>
        <FormGroup className='form-group' errorMessage={errors?.description}>
          <input
            type='text'
            name='description'
            id='description'
            defaultValue={defaultValues?.description}
            placeholder='Enter gist description'
          />
        </FormGroup>
        <FormGroup className='form-group' errorMessage={errors?.name}>
          <input type='text' name='name' id='name' placeholder='Enter file name..' defaultValue={defaultValues?.name} />
        </FormGroup>
      </div>
      <div className='form-row'>
        <FormGroup className='form-group' errorMessage={errors?.content}>
          <textarea
            name='content'
            id='content'
            placeholder='Enter file content..'
            defaultValue={defaultValues?.content}></textarea>
        </FormGroup>
      </div>
      <div className='form-row form-btn-row'>
        <Link className='btn btn-outline' to='/gists'>
          Cancel
        </Link>
        <button className='btn' type='submit' disabled={false}>
          Save
        </button>
      </div>
    </Form>
  );
}

export default GistForm;
