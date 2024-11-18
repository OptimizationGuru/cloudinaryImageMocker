
# Project Documentation

## Overview
This project is a Drag and Drop based thumbnail management system, where users can drag and drop cards representing image thumbnails, reorder them, and add new thumbnails dynamically. The layout is responsive and adapts to different screen sizes, showing 1 column for small screens, 2 columns for medium-sized screens, and 3+ columns on larger screens.



## Key Features

1) Drag and Drop: Users can drag and drop cards to reorder thumbnails.
2) Responsive Layout: The grid adjusts dynamically based on the screen size.
3) Thumbnail Management: New thumbnails can be added by clicking a button, and they are fetched from an API.
4) Zoomed View: Users can click on a card to view the image in a zoomed view.
5) Loading Spinner: Displays a spinner while images are being fetched.
## Project Structure

The project is organized into several key directories:

### `/components`
- **Card.tsx**: Renders an individual thumbnail card.
- **Spinner.tsx**: Displays a loading spinner during data fetch.
- **ZoomCard.tsx**: Shows the zoomed-in version of the thumbnail.

### `/hooks`
- **useFetchThumbnails.ts**: Custom hook to fetch thumbnail data from an API.
- **useAddThumbnail.ts**: Hook to add a new thumbnail.
- **useAddNewThumbnails.ts**: Hook for adding multiple thumbnails at once.
- **useFetchImages.ts**: Hook to fetch image data for thumbnails.
- **useFetchNewlyAddedThumbnails.ts**: Hook to fetch thumbnails that have been added recently.

### `/store`
- **thumbnailSlice.ts**: Contains the Redux slice for managing thumbnail state.
- **thumbnails.ts**: Defines TypeScript types for thumbnail data.

### `/utils`
- **dragAndDropHelper.ts**: Helper functions for implementing drag-and-drop functionality.
- **updateImageDimensions.ts**: Utility function for updating image dimensions.

### `constants.ts`
- Contains constants such as thumbnail dimensions and API URLs.

### `/data`
- **newthumbnails.ts**: A file containing static thumbnail data.

### `App.tsx`
- Main component that ties all components together and manages application flow.

This structure is designed to keep the application modular and easy to maintain.

## Installation

Install my-project with npm

```bash
Node.js (>=14.x.x)
npm (>=6.x.x) or yarn
```

Setup
Clone the repository:

```bash
git clone <https://github.com/OptimizationGuru/cloudinaryImageMocker>
cd <project_directory>
```

Install the dependencies:
```bash
npm install
# or
yarn install

```

Start the development server:
```bash
npm start
# or
yarn start

```
# Usage

## Fetching Thumbnails
Thumbnails are automatically fetched when the component is mounted using the `useFetchThumbnails` hook. The fetched data is then displayed in a grid format.

## Reordering Thumbnails
Thumbnails can be reordered by dragging and dropping them. The order is updated when the drag operation ends using the `onDragEnd` function.

## Adding Thumbnails
Click the "Add Thumbnail" button to trigger a throttled function that adds more thumbnails to the grid.

## Zooming In on Thumbnails
Clicking a thumbnail opens a modal with a zoomed-in view of the image.

### Responsive Layout
The grid layout adjusts based on screen size:
- **Mobile**: 1 card per row
- **Small Screen**: 2 cards per row
- **Large Screen**: 3 or more cards per row

## Architecture Design

## API Design

### Fetching Thumbnails
- **Endpoint**: `/api/thumbnails`
- **Method**: `GET`
- **Response**: An array of thumbnail objects containing:
  - `title`: The title of the thumbnail.
  - `publicId`: The unique identifier for the thumbnail.
  - `url`: The URL for fetching the thumbnail image.

### Adding Thumbnails
- **Method**: Simulated locally by adding thumbnail objects to the Redux store and local state.
- **Action**: Triggered via a button click that initiates a throttled function for adding new thumbnails.

---

## Architectural Approach

### State Management
- The application uses `useState` for local component state and Redux for managing the global state of thumbnails.
- Redux handles actions like adding new thumbnails and updating their order.

### Responsive Layout
- **TailwindCSS** is utilized for responsive design. Utility classes define how many columns should be displayed based on the screen width, ensuring the layout adapts to mobile, tablet, and desktop screens.

### Drag and Drop
- **@hello-pangea/dnd** library is used for drag-and-drop functionality. It allows users to reorder the thumbnails by dragging them across the grid, which updates the local state.

### Throttling
- **Lodash's throttle** function is used to control the rate at which new thumbnails are added. This ensures smooth performance by preventing frequent re-rendering of the grid.

### Modular Design
- The project uses a component-based approach in React. Components like `Card`, `Spinner`, and `ZoomCard` are isolated and reusable, allowing for easy maintenance and scalability.

### CSS Styling
- **TailwindCSS** is used for styling the components, which allows for rapid UI changes without the need for custom CSS.

## 🛠 Skills
- TypeScript: Implementing TypeScript for type safety and improved development experience in JavaScript applications.
- ReactJS: Experienced in building user interfaces and managing component lifecycles with React.
- Redux: Managing application state effectively with Redux for a predictable state container.

- TailwindCSS: Utilizing TailwindCSS for rapid UI development and responsive design.
- Cloudinary : For dynamic fetching and image optimization





## Authors

- [OptimizationGuru](https://github.com/OptimizationGuru)

-  Live Demo : [CloudinaryDnD](https://cloudinarydrapndrop.netlify.app/)

## Screenshots

