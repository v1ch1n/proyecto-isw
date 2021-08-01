import requests
from requests.api import request

# Endpoints de la API (Proyectos, sesiones y reservas)
project_url = "http://ec2-18-221-198-9.us-east-2.compute.amazonaws.com/management/projects"
session_url = "http://ec2-18-221-198-9.us-east-2.compute.amazonaws.com/management/sessions"
reserve_url = "http://ec2-18-221-198-9.us-east-2.compute.amazonaws.com/management/reservations"

# Creación de proyectos mediante el método POST
project1 = requests.post(url=project_url, json={"id_maker": 1, "nombre": "Proyecto ISW", "descripcion": "Creación de API definida"}).json()
project2 = requests.post(url=project_url, json={"id_maker": 3, "nombre": "Proyecto Testeo", "descripcion": "Probando cosas"}).json()

# Obtención de los proyectos que existen en la base de datos mediante el método GET
projects = requests.get(url=project_url).json()
print("Proyectos registrados: ", projects)

# Creación de sesiones mediante el método POST (las sesiones por defecto vienen con el parámetro 'cumplida' = false)
session1 = requests.post(url=session_url, json={"id_proyecto": project1['id']}).json()
session2 = requests.post(url=session_url, json={"id_proyecto": project2['id']}).json()

# Obtención de las sesiones que existen en la base de datos mediante el método GET
sessions = requests.get(url=session_url).json()
print("\nSesiones existentes: ", sessions) 

# Creación de reservas mediante el método POST
# Formato de timestamps -> timestamp with time zone de PostgreSQL (año-mes-día hora:minutos:segundos)
reservation1 = requests.post(url=reserve_url, json={"id_sesion": session1['id'], "timestamp": "2021-08-20 12:00:00", "id_maquina": 1}).json()
reservation2 = requests.post(url=reserve_url, json={"id_sesion": session2['id'], "timestamp": "2021-09-01 17:00:00", "id_maquina": 3}).json()

# Obtención de las reservas que existen en la base de datos mediante el método GET
reservations = requests.get(url=reserve_url).json()
print("\nReservas existentes: ", reservations)

# Actualización de timestamp de reserva mediante el método PUT
# El requisito es que la timestamp sea después de la timestamp actual (si no estaríamos reservando para una timestamp pasada)
update_reservation1 = requests.put(url=f"{reserve_url}/{reservation1['id']}", json={"timestamp": "2021-08-21 12:00:00"}).json()
update_reservation2 = requests.put(url=f"{reserve_url}/{reservation2['id']}", json={"timestamp": "2021-09-08 17:00:00"}).json()
# Ejemplo en que se reserva a una hora no válida
invalid_reservation1 = requests.put(url=f"{reserve_url}/{reservation1['id']}", json={"timestamp": "2021-03-10 12:00:00"}).json()
print("\n",invalid_reservation1)

# Actualización de estado de las sesiones mediante el método PUT
# Si la sesión está activa (cumplida = false), la finaliza (cumplida = true)
update_session1 = requests.put(url=f"{session_url}/{session1['id']}").json
update_session2 = requests.put(url=f"{session_url}/{session2['id']}").json

# Eliminación de las reservas mediante el método DELETE
delete_reservation1 = requests.delete(url=f"{reserve_url}/{reservation1['id']}").json()
delete_reservation2 = requests.delete(url=f"{reserve_url}/{reservation2['id']}").json()

# Eliminación de las sesiones mediante el método DELETE
delete_session1 = requests.delete(url=f"{session_url}/{session1['id']}").json()
delete_session2 = requests.delete(url=f"{session_url}/{session2['id']}").json()

# Eliminación de los proyectos mediante el método DELETE
delete_proyect1 = requests.delete(url=f"{project_url}/{project1['id']}").json()
delete_proyect2 = requests.delete(url=f"{project_url}/{project2['id']}").json()

# Imprimimos los proyectos, sesiones y reservas para verificar que estén vacíos
projects = requests.get(url=project_url).json()
print("\nProyectos registrados: ", projects)

sessions = requests.get(url=session_url).json()
print("\nSesiones existentes: ", sessions) 

reservations = requests.get(url=reserve_url).json()
print("\nReservas existentes: ", reservations)