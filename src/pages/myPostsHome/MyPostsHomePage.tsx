import { useCurrentUser } from "../../lib/auth/currentUserHooks";
import { auth } from "../../lib/firebase/instances";
import { Container } from "../../lib/layout/Container";
import { VStack } from "../../lib/layout/VStack";
import { H1 } from "../../lib/style/H1";
import { NewPostSection } from "./NewPostSection";
import { PostsSection } from "./PostsSection";

export function MyPostHomePage(): JSX.Element {
  const [user] = useCurrentUser(auth);

  if (!user) {
    return <p>Not logged in</p>;
  }

  return (
    <div className="MyPostHomePage my-4">
      <Container>
        <VStack>
          <H1>My posts</H1>
          <NewPostSection userId={user.uid} />
          <PostsSection userId={user.uid} />
        </VStack>
      </Container>
    </div>
  );
}
