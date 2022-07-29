# Upcharge

## Troubleshooting

- Check that the app's configuration is correct.
- Remove build files, then rebuild the application.
   - iOS: `cd ios && xcodebuild clean -workspace upcharge.xcworkspace -scheme upcharge`
   - Android: `cd android && ./gradlew clean`
- Check that dependencies are installed.
   - iOS: `cd ios && pod install`

## Running the app

### Debug

- Android: `npx react-native run-android`
- iOS: `npx react-native run-ios`, or by opening `ios/upcharge.xcworkspace` in Xcode

### Release

- Android: `npx react-native run-android --variant=release`
   - The generated APK is stored in `android/app/build/outputs/apk/release/app-release.apk`.
- iOS: `npx react-native run-ios --configuration Release`, or by opening `ios/upcharge.xcworkspace` in Xcode
   - If deploying with Xcode, go to **Product** → **Scheme** → **Edit Scheme** to change to Release.

## Configuration Files

The configuration file defines the items and categories that are available in the Upcharge app, and other miscellaneous settings. The app does not ship with a configuration, so you must create and manually deploy one to each device in use.

### Configuration Schema

| **Key**         | **Type**                  | **Description**                                                                                                                                                  |
| --------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| items           | array of Item objects     | All items that should be made available for users to add to their carts.                                                                                         |
| categories      | array of Category objects | All categories that should be used to organize items.                                                                                                            |
| emailSender     | string                    | A single email address that will be displayed as the "From" address. You must verify the email with Postmark first.                                              |
| emailRecipients | string                    | A comma-separated list of email addresses that will be used in the "To" field. Only use emails of those that have consented to receiving messages from Upcharge. |
| postmarkAPIKey  | string                    | A valid API key for the Postmark service.                                                                                                                        |
| updateURL       | string                    | The next update URL that will be used once this configuration file is installed.                                                                                 |

### Item Schema

| **Key**     | **Description**                            |
| ----------- | ------------------------------------------ |
| id          | A unique identifier for the item.          |
| title       | The item's display name.                   |
| category    | The category that the item should show in. |
| billingUnit | The *singular* unit that is being billed.  |

### Category Schema

| Key   | Description                           |
| ----- | ------------------------------------- |
| id    | A unique identifier for the category. |
| title | The category's display name.          |

### Example

```json
{
    "items": [
        {
            "id": "item-1",
            "title": "Item 1",
            "category": "services",
            "billingUnit": "piece"
        }
    ],
    "categories": [
        {
            "id": "services",
            "title": "Services"
        }
    ],
    "emailSender": "Sender@YourDomain.com",
    "emailRecipients": "Recipient1@YourDomain.com,Recipient2@YourDomain.com",
    "postmarkAPIKey": "c04e830c-2d08-4f88-ba3a-f9c3e4e6df4d",
    "updateURL": "https://yourdomain.com/upcharge-configuration-v1.json"
}
```

## Changelog

### v0.0.3

- Features
   - Manually input a quantity value

### v0.0.2

- Features
   - Support Android share menu
   - Dark Mode support
   - Add Customer Name and Ref. Number to CSV export
- Tweaks
   - Require Customer Name and Ref. Number to share
   - Switch Customer Name and Ref. Number ordering
   - "Clear all" clears metadata fields

### v0.0.1

Initial release

