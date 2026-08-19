from scholarly import scholarly
import json
from datetime import datetime
import os
import time

def fetch_author():
    last = None
    for attempt in range(3):
        try:
            a = scholarly.search_author_id(os.environ['GOOGLE_SCHOLAR_ID'])
            scholarly.fill(a, sections=['basics', 'indices', 'counts', 'publications'])
            return a
        except Exception as e:
            last = e
            time.sleep(15 * (attempt + 1))
    raise RuntimeError(f"scholarly failed after 3 attempts: {last}")

author: dict = fetch_author()
if 'citedby' not in author:
    raise RuntimeError("No 'citedby' in response - likely CAPTCHA/blocked, aborting before writing data")
name = author['name']
author['updated'] = str(datetime.now())
author['publications'] = {v['author_pub_id']:v for v in author['publications']}
print(json.dumps(author, indent=2))
os.makedirs('results', exist_ok=True)
with open(f'results/gs_data.json', 'w') as outfile:
    json.dump(author, outfile, ensure_ascii=False)

shieldio_data = {
  "schemaVersion": 1,
  "label": "citations",
  "message": f"{author['citedby']}",
}
with open(f'results/gs_data_shieldsio.json', 'w') as outfile:
    json.dump(shieldio_data, outfile, ensure_ascii=False)
