# SUPER Spec. — Mobile Admin App Setup

> Install and use the Expo Go mobile app to manage your store from anywhere.

---

## Requirements

- **iPhone or Android phone** (iOS 13+ or Android 8+)
- **Expo Go app** (free from App Store/Play Store)

---

## Installation Steps

### 1. Install Expo Go
**iOS:**
1. Open App Store
2. Search "Expo Go"
3. Install (blue "Get" button)

**Android:**
1. Open Play Store
2. Search "Expo Go"
3. Install

### 2. Connect to Your Store
1. Open Expo Go app
2. Tap "Scan QR code"
3. Point camera at the QR code in your admin dashboard
4. OR enter the URL manually: `exp://your-ip-address:8081`

### 3. Alternative: Development Mode
If QR code doesn't work:
1. On your computer: `cd apps/admin-mobile && npm start`
2. Shows a QR code in terminal
3. Scan with Expo Go

---

## App Features

### Orders Management
- **View all orders** with real-time updates
- **Filter by status** (paid, processing, fulfilled)
- **Pull to refresh** for latest orders
- **Tap order** for details and fulfillment

### Order Fulfillment
1. **Select order** from list
2. **Review** items and shipping address
3. **Tap "Mark Shipped"**
4. **Enter carrier** (USPS, UPS, FedEx)
5. **Enter tracking number**
6. **Confirm** → Customer gets shipping email

### Products Management
- **Browse all products**
- **Edit product details** (title, price, description)
- **Update inventory** counts
- **Add new products** (basic version)

### Analytics
- **Today's revenue**
- **Order count**
- **Top products**
- **Recent activity**

---

## Troubleshooting

### App Won't Load
1. **Check internet connection** on phone
2. **Make sure computer is on** and running dev server
3. **Restart Expo Go** app
4. **Re-scan QR code**

### "Metro Bundler" Error
1. **Stop dev server** (Ctrl+C in terminal)
2. **Clear cache:** `npm start -- --reset-cache`
3. **Restart dev server**

### Orders Not Updating
1. **Pull down to refresh** the orders list
2. **Check internet connection**
3. **Wait 30 seconds** for real-time sync

### Can't Fulfill Orders
1. **Make sure you're logged in** as admin
2. **Check tracking number format** (no special characters)
3. **Verify carrier name** matches dropdown options

---

## Network Setup

### Same WiFi Network
For best results:
- Phone and computer on same WiFi
- Computer not sleeping/hibernating
- Firewall allows port 8081

### Different Networks
If on different networks:
1. **Use tunneling mode:** `npx expo start --tunnel`
2. **Or use QR code** from Expo dashboard
3. **May be slower** but works anywhere

---

## Security Notes

### Admin Authentication
- **Same login** as web admin panel
- **Credentials stored securely** on device
- **Auto-logout** after inactivity

### Data Security
- **All data encrypted** in transit
- **No sensitive data** stored on device
- **Session expires** after 24 hours

---

## Performance Tips

### For Faster Loading
- **Use strong WiFi** connection
- **Keep app open** (don't background too long)
- **Close other apps** on phone

### Battery Optimization
- **Disable battery optimization** for Expo Go (Android)
- **Keep phone plugged in** during heavy use
- **Use WiFi** instead of cellular data

---

## Updates

### Automatic Updates
- **App updates automatically** when connected to dev server
- **No manual App Store updates needed**
- **Changes appear instantly** after code save

### Manual Refresh
1. **Shake phone** to open developer menu
2. **Tap "Reload"**
3. **Or double-tap R** on keyboard (if connected)

---

## Advanced Features

### Push Notifications
- **New order alerts** on your phone
- **iOS only** (Android coming soon)
- **Configure in app settings**

### Barcode Scanning
- **Scan product barcodes** for quick lookup
- **Uses phone camera**
- **Helps with inventory**

### Offline Mode
- **View cached orders** when offline
- **Queue fulfillment actions** to sync later
- **Limited functionality** without internet

---

## Emergency Procedures

### If App Crashes
1. **Force close** Expo Go
2. **Re-open** and reconnect
3. **Clear cache** if needed
4. **Contact support** if persistent

### If Computer Offline
1. **Use web admin panel** temporarily
2. **Or use tunneling mode** when back online
3. **Orders will queue** until reconnected

### Lost Phone
1. **Login to web admin** immediately
2. **Change admin password**
3. **Revoke app sessions** in settings
4. **Setup on new device**

---

## Support

### Common Issues
- **QR code not scanning** → Increase brightness, steady hand
- **Metro bundler stuck** → Restart with --reset-cache
- **Authentication failed** → Check admin credentials
- **Real-time not working** → Check Supabase connection

### Getting Help
1. **Check this guide first**
2. **Try web admin panel** as backup
3. **Contact developer** for technical issues
4. **Join Discord community** for peer support

---

## Pro Tips

### Daily Workflow
1. **Open app** in morning for order review
2. **Fulfill orders** as they come in
3. **Check analytics** at end of day
4. **Update inventory** as needed

### Batch Operations
- **Fulfill multiple orders** in sequence
- **Update product prices** in bulk
- **Review all pending orders** at once

### Time Savers
- **Use search** to find specific orders
- **Filter by date range** for reports
- **Bookmark frequently used** product pages

---

**You're now ready to manage your store from anywhere! 📱**
