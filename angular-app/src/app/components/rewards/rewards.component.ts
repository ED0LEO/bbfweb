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
export class RewardsComponent implements OnInit {
  videoList: Video[] = [];

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.fetchRecommendedVideos();
  }

  fetchRecommendedVideos(): void {
    // Replace 'YOUR_YOUTUBE_API_KEY' with your actual YouTube API key
    const apiKey = 'YOUR_YOUTUBE_API_KEY';
    const videoId = 'Xw0WKPwQumw'; // Replace with your desired video's ID
    const maxResults = 20; // Number of recommended videos to fetch
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${videoId}&maxResults=${maxResults}&type=video&key=${apiKey}`;

    this.http.get<any>(apiUrl).subscribe(
      (response) => {
        const recommendedVideos = response.items.map((item: any) => {
          const videoId = item.id.videoId;
          const videoUrl = `https://www.youtube.com/embed/${videoId}`;

          return {
            title: item.snippet.title,
            url: this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl)
          };
        });

        // Randomly pick 3 videos from the recommendedVideos list
        this.videoList = this.getRandomVideos(recommendedVideos, 3);
      },
      (error) => {
        console.error('Failed to fetch recommended videos:', error);
      }
    );
  }

  // Function to pick 'count' random videos from the video list
  private getRandomVideos(videos: Video[], count: number): Video[] {
    const randomVideos: Video[] = [];
    const videoCount = videos.length;

    while (randomVideos.length < count && randomVideos.length < videoCount) {
      const randomIndex = Math.floor(Math.random() * videoCount);
      const randomVideo = videos[randomIndex];

      if (!randomVideos.includes(randomVideo)) {
        randomVideos.push(randomVideo);
      }
    }

    return randomVideos;
  }

  rollVideo(): void {
    this.fetchRecommendedVideos();
  }
}

