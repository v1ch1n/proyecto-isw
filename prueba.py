import requests

def user_emails():
    response = requests.get("http://ec2-18-221-198-9.us-east-2.compute.amazonaws.com/user-emails")
    return response.json()

def prints_status():
    response = requests.get("http://ec2-18-221-198-9.us-east-2.compute.amazonaws.com/prints-status")
    return response.json()

def user_prints(email):
    query = {}
    query["user"] = email
    response = requests.get("http://ec2-18-221-198-9.us-east-2.compute.amazonaws.com/user-prints", params=query)
    return response.json()

def prints_by_year(year):
    query = {}
    query["year"] = year
    response = requests.get("http://ec2-18-221-198-9.us-east-2.compute.amazonaws.com/prints-by-year", params=query)
    return response.json()

def workgroup_users(workgroup):
    query = {}
    query["group"] = workgroup
    response = requests.get("http://ec2-18-221-198-9.us-east-2.compute.amazonaws.com/workgroup-users", params=query)
    return response.json()

print("Correos de los usuarios registrados en la plataforma: ")
print(user_emails())

print("\nNúmero de impresiones realizadas con los resultados de impresión: ")
print(prints_status())

print("\nImpresiones por usuario: ")
print(user_prints("jose.tomas@fablab.usm.cl"))

print("\nUsuarios que han impreso en cierto año: ")
print(prints_by_year(2021))

print("\nUsuarios pertenecientes a cierto grupo de trabajo: ")
print(workgroup_users("FABLAB"))