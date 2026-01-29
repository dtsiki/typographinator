import { Container } from './componens/Container/Container';
import { Heading } from './componens/Heading/Heading';
import { Form } from './componens/Form/Form';
import { Footer } from './componens/Footer/Footer';

export const App = () => {
  return (
    <Container>
      <Heading />
      <Form />
      <Footer />
    </Container>
  );
};
