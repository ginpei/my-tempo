import { useCurrentUser } from "../../lib/auth/currentUserHooks";
import { auth } from "../../lib/firebase/instances";
import { Container } from "../../lib/layout/Container";
import { VStack } from "../../lib/layout/VStack";
import { H1 } from "../../lib/style/H1";
import { MyProfileSection } from "./MyProfileSection";

export function MyPage(): JSX.Element {
  const [user] = useCurrentUser(auth);

  if (!user) {
    return <div>...</div>;
  }

  return (
    <div className="MyPage">
      <Container>
        <VStack>
          <H1>MyPage</H1>
          <MyProfileSection userId={user.uid} />
        </VStack>
      </Container>
    </div>
  );
}
