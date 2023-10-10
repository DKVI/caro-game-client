import React from "react";

const RequireMess = () => {
  return `<div class="mt-1 text-[10px] text-red text-left error-message">
      This field is required!
    </div>`;
};

const MinLengthMess = (length) => {
  return `<div class="mt-1 text-[10px] text-red text-left error-message">
      This field must be at least ${length} characters!
    </div>`;
};

const ValidateEmailMess = () => {
  return `<div class="mt-1 text-[10px] text-red text-left error-message">
      This field must be a valid email address!
    </div>`;
};

const IsConfirmMess = () => {
  return `<div class="mt-1 text-[10px] text-red text-left error-message">
      This field must be the same as password!
    </div>`;
};

export { RequireMess, MinLengthMess, ValidateEmailMess, IsConfirmMess };
