import random
import requests

planets_created = 0

name = ["Mercurio", "Venus", "Tierra", "Marte", "Jupiter", "Saturno", "Urano", "Neptuno"]
haveWater = [True, False]
picture = ["https://cdn.pixabay.com/photo/2012/01/09/09/33/mercury-11591_960_720.png",
 "https://cdn.pixabay.com/photo/2011/12/13/14/28/earth-11009_960_720.jpg", 
 "https://cdn.pixabay.com/photo/2011/12/13/14/30/mars-11012_960_720.jpg",
 "https://cdn.pixabay.com/photo/2012/11/28/09/17/neptune-67537_960_720.jpg",
 "https://cdn.pixabay.com/photo/2022/01/14/22/58/jupiter-6938302_960_720.jpg"]

while planets_created <= 100000:
    planet_name = random.choice(name) + "_" + str(planets_created)

    planet = {
        "name": planet_name,
        "haveWater": random.choice(haveWater),
        "orbitalPeriod": random.randint(1, 365),
        "satellite": random.randint(0, 100),
        "picture": random.choice(picture)
    }

    # Request to the API to create the planet
    response = requests.post("http://localhost:4000/api/v1/planets", json=planet)

    # if the planet was created successfully, print the planet 
    # name and update the counter
    if response.status_code == 201:
        planets_created += 1
        print("Created planet: " + planet_name + " Count: " + str(planets_created))
