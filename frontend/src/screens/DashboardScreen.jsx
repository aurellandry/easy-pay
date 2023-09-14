import React from 'react';
import { Dropdown, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const DashboardScreen = () => {
  const { userInfo } = useSelector(state => state.auth);
  const actionsButtonStyle = {
    color: 'black',
    border: '1px solid #dadada',
    backgroundColor: 'white',
  }

  return (
    <div>
      <br/>
  
      <h1>Bonjour, {userInfo.firstName}.</h1>
      <p>
        Bienvenue sur votre tableau de bord !
      </p>
      
      <br/>

      <h3>Liste des restaurants</h3>
      <Table responsive="sm" striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nom</th>
            <th>Adresse</th>
            <th>Créé le</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>
              <Dropdown>
                <Dropdown.Toggle
                  variant="outline-light"
                  style={actionsButtonStyle}
                >
                  Actions
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">
                    <FaEdit /> Modifier
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    <FaTrashAlt /> Supprimer
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default DashboardScreen;