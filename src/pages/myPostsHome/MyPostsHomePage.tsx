import { Container } from "../../lib/layout/Container";
import { VStack } from "../../lib/layout/VStack";
import { H1 } from "../../lib/style/H1";
import { NewPostSection } from "./NewPostSection";
import { PostsSection } from "./PostsSection";

export function MyPostHomePage(): JSX.Element {
  return (
    <div className="MyPostHomePage my-4">
      <Container>
        <VStack>
          <H1>My posts</H1>
          <NewPostSection />
          <PostsSection />
        </VStack>
      </Container>
    </div>
  );
}
