#!/usr/bin/env python3
"""Debug script to monitor the frontend and capture errors/screenshots"""

from playwright.sync_api import sync_playwright
import time
import json

def debug_frontend():
    print("🔍 Starting frontend debug session...")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)  # Visible browser for debugging
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
                print(f"❌ Console Error: {msg.text[:200]}")

        def handle_page_error(error):
            errors.append(str(error))
            print(f"💥 Page Error: {str(error)[:200]}")

        page.on('console', handle_console)
        page.on('pageerror', handle_page_error)

        print("📡 Navigating to localhost:3000...")
        page.goto('http://localhost:3000', wait_until='domcontentloaded')

        print("⏳ Waiting for network idle...")
        try:
            page.wait_for_load_state('networkidle', timeout=30000)
        except:
            print("⚠️ Network didn't fully idle (WebSocket keeps connection open)")

        # Take initial screenshot
        page.screenshot(path='/tmp/frontend_initial.png', full_page=True)
        print("📸 Screenshot saved: /tmp/frontend_initial.png")

        # Wait and collect more data
        print("👀 Monitoring for 30 seconds...")
        for i in range(6):
            time.sleep(5)
            print(f"   ... {(i+1)*5}s - {len(errors)} errors so far")
            if errors:
                # Take screenshot when error occurs
                page.screenshot(path=f'/tmp/frontend_error_{i}.png')

        # Final screenshot
        page.screenshot(path='/tmp/frontend_final.png', full_page=True)
        print("📸 Final screenshot saved: /tmp/frontend_final.png")

        # Summary
        print("\n" + "="*50)
        print("📊 DEBUG SUMMARY")
        print("="*50)
        print(f"Total console messages: {len(console_logs)}")
        print(f"Total errors: {len(errors)}")

        if errors:
            print("\n❌ ERRORS FOUND:")
            for i, err in enumerate(errors[:10]):
                print(f"  {i+1}. {err[:150]}...")
        else:
            print("\n✅ No errors detected!")

        # Save full log
        with open('/tmp/frontend_debug.json', 'w') as f:
            json.dump({
                'console_logs': console_logs[-50:],  # Last 50
                'errors': errors,
            }, f, indent=2)
        print("\n📝 Full log saved: /tmp/frontend_debug.json")

        browser.close()

if __name__ == '__main__':
    debug_frontend()
