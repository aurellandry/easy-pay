import { Container, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from 'react-router-bootstrap';

const Hero = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          <h1 className="text-center mb-4">Easy Pay</h1>
          <ul>
            <li className="mb-4">
              <b>Développez votre activité grâce au potentiel de notre plateforme</b> :
              Nous donnons aux entreprises les moyens de mettre en place facilement des
              solutions de paiement rapides, et des opérations de livraison.
            </li>
            <li className="mb-4">
              <b>Pas de frais cachés</b> :
              Découvrez nos prix simples et transparents, pour l'ensemble de nos services.
            </li>
          </ul>
          { !userInfo && 
            <div className="d-flex">
              <LinkContainer to='/login'>
                <Button variant="primary" className="me-3">
                  Connexion
                </Button>
              </LinkContainer>
              <LinkContainer to='/register'>
                <Button variant="secondary">
                  Inscription
                </Button>
              </LinkContainer>
            </div>
          }
        </Card>
      </Container>
    </div>
  )
}

export default Hero
