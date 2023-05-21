import { ChangeEventHandler, FormEventHandler } from "react";
import { VStack } from "../layout/VStack";
import { Button } from "../style/Button";
import { TextInput } from "../style/TextInput";
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

  const onFormChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "name") {
      onChange?.({ ...profile, name: value });
    } else {
      throw new Error(`Unexpected form field: ${name}`);
    }
  };

  return (
    <form className="ProfileForm" onSubmit={onFormSubmit}>
      <fieldset disabled={disabled}>
        <VStack>
          <TextInput name="name" onChange={onFormChange} value={profile.name} />
          <Button>Save</Button>
        </VStack>
      </fieldset>
    </form>
  );
}
