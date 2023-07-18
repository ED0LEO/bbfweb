import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface Video {
  title: string;
  url: SafeResourceUrl;
}

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.css']
})
// ... (imports and component decorator)

export class RewardsComponent implements OnInit {
  videoList: Video[] = [];
  videoIndex: number = 0;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.fetchRecommendedVideos();
  }

  fetchRecommendedVideos(): void {
    // Replace 'YOUR_YOUTUBE_API_KEY' with your actual YouTube API key
    const apiKey = 'YOUR_YOUTUBE_API_KEY';
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&relatedToVideoId=Xw0WKPwQumw&maxResults=9&key=${apiKey}`;

    this.http.get<any>(apiUrl).subscribe(
      (response) => {
        const items = response.items;
        this.videoList = items.map((item: any) => {
          const videoId = item.id.videoId;
          const videoUrl = `https://www.youtube.com/embed/${videoId}`;
          return {
            title: item.snippet.title,
            url: this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl),
          };
        });
        this.rollVideo(); // Call rollVideo() after updating the videoList
      },
      (error) => {
        console.error('Failed to fetch videos:', error);
      }
    );
  }

  rollVideo(): void {
    // Generate a random index to pick a video from the list
    this.videoIndex = Math.floor(Math.random() * this.videoList.length);
  }
}
