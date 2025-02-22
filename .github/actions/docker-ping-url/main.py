import os
import requests
import time

def ping_url(url, max_trials, delay):
    
    for i in range(max_trials):
        response = requests.get(url)
        if(response.status_code == 200):
            return True
        else:
            time.sleep(delay)
    return False

def run():
    website_url = os.getenv("INPUT_URL")
    delay = int(os.getenv("INPUT_DELAY"))
    max_trials = os.getenv("INPUT_MAX_TRIALS")

    website_reachable = ping_url(website_url, delay, max_trials)
    if( not website_reachable):
        raise Exception("Website not reachable")
if __name__ == "__main__":
    run()
