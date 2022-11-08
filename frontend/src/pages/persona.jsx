import React, { useEffect, useState } from 'react';
import { Page, Navbar, Block, BlockTitle } from 'framework7-react';
import personaService from '../service/personaService';

function Persona() {

    const [persona, setPersona] = useState('');

    useEffect(() => {
        buscarPersona();
    }, []);

    const buscarPersona = async () => {
        const persona = await personaService.buscarPersona();
        setPersona(persona);
    }

    return <Page>
        <Navbar title="Persona" />
        <BlockTitle>Info de persona</BlockTitle>
        <Block strong>
            <p>{persona.nombre}</p>
            <p>{persona.edad}</p>
        </Block>
    </Page>


}

export default Persona;