
export interface ContactoData {
  nombre: string;
  email: string;
  mensaje: string;
}

export interface ApiResponse {
  message: string;
  id: number;
}

export async function guardarContacto(data: ContactoData): Promise<ApiResponse> {
  const response = await fetch('http://localhost:3000/api/save', {
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
