import { VStack } from "../layout/VStack";
import { Button } from "../style/Button";

export interface AuthFormProps {
}

export function AuthForm({}: AuthFormProps): JSX.Element {
  const onEmailClick = () => {
    console.log(`# Email Clicked`);
  };
  
  const onGoogleClick = () => {
    console.log(`# Google Clicked`);
  };

  const onGitHubClick = () => {
    console.log(`# GitHub Clicked`);
  };
  
  return (
    <article className="AuthForm w-96 mx-auto">
      <VStack>
        <Button onClick={onEmailClick}>EMail</Button>
        <Button onClick={onGoogleClick}>Google</Button>
        <Button onClick={onGitHubClick}>GitHub</Button>
      </VStack>
    </article>
  );
}
