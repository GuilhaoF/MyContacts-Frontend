import { Container } from './styles';
import Logo from '../../assets/images/logoHeader.svg';

export default function Header() {
  return (
    <Container>
      <img src={Logo} alt="MyContacts" width="201" />
    </Container>
  );
}
