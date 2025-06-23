
export interface ContactoData {
  nombre: string;
  email: string;
  pais: string;
  telefono: string;
  mensaje: string;
}
export interface ApiResponse {
  message: string;
  id: number;
}

export async function guardarContacto(data: ContactoData): Promise<ApiResponse> {
  const response = await fetch('http://localhost:3001/api/registro', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Error al guardar contacto');
  }

  return response.json();
}
