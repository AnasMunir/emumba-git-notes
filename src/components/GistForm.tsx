import { Form, Link } from "react-router-dom";
import FormGroup from "./FormGroup";

interface IGistForm {
  errors: TGistFormErrors;
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
function GistForm({ errors }: IGistForm) {
  return (
    <Form method='post' className='form'>
      <div className='form-row'>
        <FormGroup className='form-group' errorMessage={errors?.description}>
          <input type='text' name='description' id='description' placeholder='Enter gist description' />
        </FormGroup>
        <FormGroup className='form-group' errorMessage={errors?.name}>
          <input type='text' name='name' id='name' placeholder='Enter file name..' />
        </FormGroup>
      </div>
      <div className='form-row'>
        <FormGroup className='form-group' errorMessage={errors?.content}>
          <textarea name='content' id='content' placeholder='Enter file content..'></textarea>
        </FormGroup>
      </div>
      <div className='form-row form-btn-row'>
        <Link className='btn btn-outline' to='/posts'>
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
