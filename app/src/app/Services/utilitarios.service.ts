import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable, SecurityContext } from "@angular/core";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Injectable({
  providedIn: "root",
})
export class UtilitariosService {
  constructor(private http: HttpClient,
    private sanitizer: DomSanitizer,
  ) { }

  previewPdf() { }

  subirArchivo(endpoint: string, formData: FormData): Observable<any> {
    const url = environment.urlAPI + endpoint;
    return this.http.post(url, formData).pipe(map((response) => response));
  }

  sanitizarUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      this.sanitizer.sanitize(SecurityContext.URL, url)
    );
  }

  sanitizarBlobURl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      url
    );
  }
}
