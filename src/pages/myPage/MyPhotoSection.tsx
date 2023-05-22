import { useState } from "react";
import { toError } from "../../lib/error/misc";
import { db, storage } from "../../lib/firebase/instances";
import { VStack } from "../../lib/layout/VStack";
import { Working } from "../../lib/misc";
import { Profile } from "../../lib/profile/Profile";
import { ProfilePhotoForm } from "../../lib/profile/ProfilePhotoForm";
import { saveProfile } from "../../lib/profile/profileDb";
import { useProfile } from "../../lib/profile/profileHooks";
import { uploadProfilePhoto } from "../../lib/profile/profilePhoto";
import { H2 } from "../../lib/style/H2";

export interface MyPhotoSectionProps {
  userId: string;
}

export function MyPhotoSection({ userId }: MyPhotoSectionProps): JSX.Element {
  const [profile] = useProfile(db, userId);
  const [photo, setPhoto] = useState<File | Working | null>(Working);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const photoUrl = getPhotoUrl(profile, photo);
  const working = saving || profile === Working;

  const onFormSubmit = async () => {
    if (!profile || photo === Working || photoUrl === profile.photoUrl) {
      return;
    }

    setError(null);
    setSaving(true);

    try {
      const url = await uploadProfilePhoto(storage, profile.id, photo);
      await saveProfile(db, { ...profile, photoUrl: url });
    } catch (error) {
      console.error(error);
      setError(toError(error));
    } finally {
      setSaving(false);
    }
  };

  const onFormChange = async (file: File | null) => {
    setError(null);

    try {
      if (file && !file.type.startsWith("image/")) {
        throw new Error("Image file is required");
      }
      setPhoto(file);
    } catch (error) {
      console.error(error);
      setError(toError(error));
    }
  };

  return (
    <VStack as="article" className="MyPhotoSection">
      <H2>Photo</H2>
      {error && <p className="text-red-500">{error.message}</p>}
      <ProfilePhotoForm
        disabled={working}
        onChange={onFormChange}
        onSubmit={onFormSubmit}
        photoUrl={photoUrl}
      />
    </VStack>
  );
}
function getPhotoUrl(
  profile: Profile | null | undefined,
  photo: File | null | undefined
) {
  if (!profile) {
    return Working;
  }

  if (photo === Working) {
    return profile.photoUrl;
  }

  if (photo) {
    return URL.createObjectURL(photo);
  }

  return "";
}
