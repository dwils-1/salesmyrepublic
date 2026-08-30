from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
import os

TOKEN_FILE = os.path.expanduser("~/gsc/token.json")
SITE = "sc-domain:salesmyrepublic.my.id"
SITEMAP = "https://salesmyrepublic.my.id/sitemap.xml"
SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]

creds = Credentials.from_authorized_user_file(TOKEN_FILE, SCOPES)

service = build(
    "searchconsole",
    "v1",
    credentials=creds
)

print("=== PROPERTY ===")
sites = service.sites().list().execute()

for s in sites.get("siteEntry", []):
    print(
        s.get("siteUrl"),
        "| permission:",
        s.get("permissionLevel")
    )

print()
print("=== SITEMAP LIVE ===")

data = service.sitemaps().get(
    siteUrl=SITE,
    feedpath=SITEMAP
).execute()

for key in [
    "path",
    "lastSubmitted",
    "isPending",
    "isSitemapsIndex",
    "lastDownloaded",
    "warnings",
    "errors"
]:
    print(f"{key}: {data.get(key)}")

print()
print("=== URL INSPECTION ===")

for slug in ["bandung", "bsd", "surabaya", "jakarta"]:
    url = f"https://salesmyrepublic.my.id/{slug}/"

    result = service.urlInspection().index().inspect(
        body={
            "inspectionUrl": url,
            "siteUrl": SITE,
            "languageCode": "id-ID"
        }
    ).execute()

    index = result.get("inspectionResult", {}).get(
        "indexStatusResult", {}
    )

    print()
    print(slug)
    print(" verdict:", index.get("verdict"))
    print(" coverage:", index.get("coverageState"))
    print(" lastCrawl:", index.get("lastCrawlTime"))
    print(" fetch:", index.get("pageFetchState"))
    print(" indexing:", index.get("indexingState"))
    print(" googleCanonical:", index.get("googleCanonical"))
