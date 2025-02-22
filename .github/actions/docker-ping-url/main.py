import os
import requests
import time

def ping_url(url, max_trials, delay):
    
    for i in range(max_trials):
        try:
            response = requests.get(url)
            if(response.status_code == 200):
                return True
        except requests.ConnectionError:
            print(f"Website {url} is unreachable. Retrying in {str(delay)} seconds...")
            time.sleep(int(delay))
        except requests.exceptions.MissingSchema:
            print(f"Invalid URL format for {url}")
            return False
    return False

def run():
    website_url = os.getenv("INPUT_URL")
    delay = int(os.getenv("INPUT_DELAY"))
    max_trials = os.getenv("INPUT_MAX_TRIALS")

    website_reachable = ping_url(website_url, max_trials, delay)
    if( not website_reachable):
        raise Exception("Website not reachable")
    print(f"Website {website_url} is reachable")
    print(website_reachable)

    output_file = os.getenv("GITHUB_OUTPUT")
    with open(output_file, 'a') as git:
        print(f"url-reachable={website_reachable}", file=git)
if __name__ == "__main__":
    run()
