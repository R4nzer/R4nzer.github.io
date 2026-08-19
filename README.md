# Runze Ma's Academic Homepage

Personal academic homepage of **Runze Ma (马润泽)**, live at https://r4nzer.github.io.

Built with Jekyll, based on the [AcadHomepage](https://github.com/RayeRen/acad-homepage.github.io) template (MIT License).

## Features

- **Google Scholar citations**: displayed under Publications via the `google-scholar-stats` branch (updated daily by the `.github/workflows/google_scholar_crawler.yaml` workflow at 08:15 UTC, and on every push to `main`).
  - Requires the Actions secret `GOOGLE_SCHOLAR_ID` (Settings → Secrets and variables → Actions), value = the `user=` parameter of the Google Scholar profile URL.
  - If the workflow fails (scholarly is occasionally CAPTCHA-blocked on GitHub runners), re-run it manually via the Actions tab (`workflow_dispatch`), or regenerate locally:
    ```bash
    cd google_scholar_crawler
    python3 -m venv /tmp/gs-venv && /tmp/gs-venv/bin/pip install scholarly==1.7.11
    GOOGLE_SCHOLAR_ID=<YOUR_ID> /tmp/gs-venv/bin/python main.py
    # then push results/gs_data.json + gs_data_shieldsio.json to the google-scholar-stats branch
    ```
- **SEO**: meta description, Open Graph image, sitemap, robots.txt, custom 404.

## Local development

```bash
bundle exec jekyll serve        # http://127.0.0.1:4000
```

Deploy: push to `main`; GitHub Pages builds and publishes automatically.

## CVs

Compiled CV PDFs live in `docs/` (`cv_en.pdf`, `cv_zh.pdf`), sourced from the separate LaTeX project in `../CV/`.
