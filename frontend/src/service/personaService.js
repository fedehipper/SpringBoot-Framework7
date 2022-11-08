import axios from "axios";

const personaService = {

    buscarPersona: async () => {
        const response = await axios.get('/api/persona');
        return response.data;
    }

}

export default personaService;