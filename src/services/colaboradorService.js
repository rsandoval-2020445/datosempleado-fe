const API_URL = 'http://localhost:3000/colaborador'

export const getColaboradores = async () => {
    try {
        const response = await fetch(API_URL)
        if (!response.ok) {
            throw new Error('Error al cargar colaboradores')
        }
        const data = await response.json()
        
        return data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const createColaborador = async (colaborador) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        
        body: JSON.stringify(colaborador),
        })

        if (!response.ok) throw new Error('Error al crear colaborador')
            return await response.json()

    } catch (error) {
        console.error(error)
        throw error
    }
}

export const updateColaborador = async (id, colaborador) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(colaborador),
        })

        if (!response.ok) throw new Error('Error al actualizar colaborador')
            return await response.json()

    } catch (error) {
        console.error(error)
        throw error
    }
}

export const deleteColaborador = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        })

        if (!response.ok) throw new Error('Error al eliminar el colaborador')
            return await response.json()
    } catch (error) {
        console.error(error)
        throw error
    }
}