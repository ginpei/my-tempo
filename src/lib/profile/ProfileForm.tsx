import { ChangeEventHandler, FormEventHandler } from "react";
import { VStack } from "../layout/VStack";
import { Button } from "../style/Button";
import { TextArea } from "../style/TextArea";
import { TextInput } from "../style/TextInput";
import { VInputField } from "../style/VInputField";
import { Profile } from "./Profile";

export interface ProfileFormProps {
  disabled?: boolean;
  onChange?: (profile: Profile) => void;
  onSubmit?: (profile: Profile) => void;
  profile: Profile;
}

export function ProfileForm({
  disabled,
  onChange,
  onSubmit,
  profile,
}: ProfileFormProps): JSX.Element {
  const onFormSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    onSubmit?.(profile);
  };

  const onFormChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "name" || name === "message") {
      onChange?.({ ...profile, [name]: value });
    } else {
      throw new Error(`Unexpected form field: ${name}`);
    }
  };

  return (
    <form className="ProfileForm" onSubmit={onFormSubmit}>
      <fieldset disabled={disabled}>
        <VStack>
          <VInputField label="Name">
            <TextInput
              name="name"
              onChange={onFormChange}
              value={profile.name}
            />
          </VInputField>
          <VInputField label="Message">
            <TextArea
              name="message"
              onChange={onFormChange}
              value={profile.message}
            />
          </VInputField>
          <Button>Save</Button>
        </VStack>
      </fieldset>
    </form>
  );
}
