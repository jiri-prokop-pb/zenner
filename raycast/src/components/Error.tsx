import { Detail, showToast, Toast } from "@raycast/api";
import { ReactElement } from "react";
import { DEFAULT_ERROR_TITLE, UnknownErrorText } from "../constants";

export function UnknownError(): ReactElement {
  showToast(Toast.Style.Failure, DEFAULT_ERROR_TITLE);

  return <Detail markdown={UnknownErrorText} />;
}
