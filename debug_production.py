#!/usr/bin/env python3
"""Debug script to monitor PRODUCTION frontend and capture errors"""

from playwright.sync_api import sync_playwright
import time
import json

PROD_URL = "https://cc-lime-alpha.vercel.app"

def debug_production():
    print(f"🔍 Starting PRODUCTION debug session: {PROD_URL}")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)  # Visible browser
        context = browser.new_context(viewport={'width': 1400, 'height': 900})
        page = context.new_page()

        # Capture console logs
        console_logs = []
        errors = []

        def handle_console(msg):
            log_entry = f"[{msg.type}] {msg.text}"
            console_logs.append(log_entry)
            if msg.type == 'error':
                errors.append(msg.text)
                print(f"❌ Error: {msg.text[:200]}")

        def handle_page_error(error):
            errors.append(str(error))
            print(f"💥 Page Error: {str(error)[:200]}")

        page.on('console', handle_console)
        page.on('pageerror', handle_page_error)

        print(f"📡 Navigating to {PROD_URL}...")
        page.goto(PROD_URL, wait_until='domcontentloaded')

        print("⏳ Waiting for initial load...")
        try:
            page.wait_for_load_state('networkidle', timeout=15000)
        except:
            print("⚠️ Network didn't fully idle (WebSocket active)")

        # Take initial screenshot
        page.screenshot(path='/tmp/prod_initial.png', full_page=True)
        print("📸 Initial screenshot: /tmp/prod_initial.png")

        # Wait and collect errors
        print("👀 Monitoring for 45 seconds (go shower!)...")
        for i in range(9):
            time.sleep(5)
            error_count = len(errors)
            print(f"   {(i+1)*5}s - {error_count} errors")

            # Screenshot on new errors
            if error_count > 0 and i % 3 == 0:
                page.screenshot(path=f'/tmp/prod_check_{i}.png')

        # Final screenshot
        page.screenshot(path='/tmp/prod_final.png', full_page=True)
        print("📸 Final screenshot: /tmp/prod_final.png")

        # Summary
        print("\n" + "="*50)
        print("📊 PRODUCTION DEBUG SUMMARY")
        print("="*50)
        print(f"URL: {PROD_URL}")
        print(f"Total console messages: {len(console_logs)}")
        print(f"Total errors: {len(errors)}")

        if errors:
            print("\n❌ ERRORS FOUND:")
            for i, err in enumerate(set(errors[:10])):  # Unique errors
                print(f"  {i+1}. {err[:200]}")
        else:
            print("\n✅ No errors detected!")

        # Save full log
        with open('/tmp/prod_debug.json', 'w') as f:
            json.dump({
                'url': PROD_URL,
                'console_logs': console_logs[-100:],
                'errors': list(set(errors)),  # Unique
            }, f, indent=2)
        print("\n📝 Full log: /tmp/prod_debug.json")

        input("\nPress Enter to close browser...")
        browser.close()

if __name__ == '__main__':
    debug_production()
