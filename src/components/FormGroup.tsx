import { ReactNode } from "react";

interface IFormGroup {
  children: ReactNode;
  errorMessage?: string;
  className?: string;
}

function FormGroup({ children, errorMessage }: IFormGroup) {
  return (
    <>
      <div className={`form-group ${errorMessage != null ? "error" : ""}`}>
        {children}
        {errorMessage != null && <div className='error-message'>Required</div>}
      </div>
    </>
  );
}

export default FormGroup;
