import { Button } from './ui/button';

type RegisterSpeakerButtonProps = {
  onClick?: () => void;
};

export function RegisterSpeakerButton({ onClick }: RegisterSpeakerButtonProps) {
  return <Button onClick={onClick}>Register as Speaker</Button>;
}
