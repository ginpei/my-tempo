import { useEffect, useState } from "react";
import { toError } from "../../lib/error/misc";
import { db } from "../../lib/firebase/instances";
import { VStack } from "../../lib/layout/VStack";
import { Working } from "../../lib/misc";
import { Profile, createProfile } from "../../lib/profile/Profile";
import { ProfileForm } from "../../lib/profile/ProfileForm";
import { saveProfile } from "../../lib/profile/profileDb";
import { useProfile } from "../../lib/profile/profileHooks";
import { H2 } from "../../lib/style/H2";
import { sleep } from "../../lib/time/wait";

export interface MyProfileSectionProps {
  userId: string;
}

export function MyProfileSection({
  userId,
}: MyProfileSectionProps): JSX.Element {
  const [originalProfile] = useProfile(db, userId);
  const [profile, setProfile] = useState(createProfile());
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const working = saving || originalProfile === Working;

  useEffect(() => {
    if (originalProfile === Working) {
      return;
    }

    setProfile(originalProfile ?? createProfile());
  }, [originalProfile]);

  const onPostChange = (newProfile: Profile) => {
    setProfile(newProfile);
  };

  const onPostSubmit = async (profile: Profile) => {
    setError(null);
    setSaving(true);

    try {
      await Promise.all([
        saveProfile(db, { ...profile, id: userId }),
        sleep(1000),
      ]);
    } catch (error) {
      console.error(error);
      setError(toError(error));
    } finally {
      setSaving(false);
    }
  };

  return (
    <VStack as="article" className="MyProfileSection">
      <H2>Edit profile</H2>
      {error && <p className="text-red-500">{error.message}</p>}
      <ProfileForm
        disabled={working}
        onChange={onPostChange}
        onSubmit={onPostSubmit}
        profile={profile}
      />
    </VStack>
  );
}
