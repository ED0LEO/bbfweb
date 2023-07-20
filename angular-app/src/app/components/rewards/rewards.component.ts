import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface Video {
  title: string;
  url: SafeResourceUrl;
  thumbnailUrl: SafeResourceUrl; // Add thumbnail URL property
}

const presetVideoIds = [
  'w5NEIok80pw',
  'MFlrVLNZjJY',
  '0SuDVcTv25g',
  'RSF65yVFRTw',
  '3iz5LZGrp',
  'GDYiqIaVCQk',
  'iLs8t1N8Xkw',
  'ecZrWiUXLg0',
  'HeQX2HjkcNo',
  'HjXqzH8wCyg',
  'KvrHYS0RaLA',
  'AjkiBRNVeV8',
  'qWycdTGq0VA',
  'EyBDtUtyshk',
  'XFDM1ip5HdU',
];

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.css'],
})
export class RewardsComponent implements OnInit {
  videoList: Video[] = [];
  videoIndex: number = 0;
  isRolling: boolean = false;
  stopIndex: number | null = null;
  showThumbnails: boolean = true;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.fetchRecommendedVideos();
  }

  fetchRecommendedVideos(): void {
    // Replace 'YOUR_YOUTUBE_API_KEY' with your actual YouTube API key
    const apiKey = 'YOUR_YOUTUBE_API_KEY';
    const amountOfResults = 3;

    // Select a random video ID from the preset list
    const randomVideoId = presetVideoIds[Math.floor(Math.random() * presetVideoIds.length)];


    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&relatedToVideoId=${randomVideoId}&maxResults=${amountOfResults}&key=${apiKey}`;

    this.http.get<any>(apiUrl).subscribe(
      (response) => {
        const items = response.items;
        this.videoList = items.map((item: any) => {
          const videoId = item.id.videoId;
          const videoUrl = `https://www.youtube.com/embed/${videoId}`;
          const thumbnailUrl = item.snippet.thumbnails.medium.url;
          return {
            title: item.snippet.title,
            url: this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl),
            thumbnailUrl: this.sanitizer.bypassSecurityTrustResourceUrl(thumbnailUrl),
          };
        });
      },
      (error) => {
        console.error('Failed to fetch videos:', error);
      }
    );
  }

  rollVideo(): void {
    this.isRolling = true;
    this.stopIndex = null;

    // Generate a random index to pick a video from the list
    const randomIndex = Math.floor(Math.random() * this.videoList.length);

    // Generate a random number of rolls between 5 and 10
    const totalRolls = Math.floor(Math.random() * 6) + 5;

    // Calculate the index to stop the rolling animation
    const lastIndex = (randomIndex + totalRolls) % this.videoList.length;

    // Start the rolling animation
    this.animateRoll(0, lastIndex, 0);

    // Show the thumbnails during rolling
    this.showThumbnails = true;
  }

  animateRoll(currentIndex: number, lastIndex: number, count: number): void {
    if (count >= 20) {
      // The rolling animation is complete
      this.isRolling = false;
      this.stopIndex = lastIndex;
    } else {
      setTimeout(() => {
        this.animateRoll((currentIndex + 1) % this.videoList.length, lastIndex, count + 1);
      }, 100);
    }
  }

  playSelectedVideo(): void {
    if (!this.isRolling && this.stopIndex !== null) {
      this.isRolling = true;
      setTimeout(() => {
        this.isRolling = false;
        // Hide the thumbnails after the rolling stops
        this.showThumbnails = false;
      }, 2000); // Adjust the duration of the stop animation
    }
  }
}
