# How To Setup F-Kit in Your Project

* Open Epic Games Launcher and launch your installed version of Unreal Engine

<figure><img src="https://1689566151-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fr7ZiGN2LM1O6jHUxXhof%2Fuploads%2F1kvWDBpqHfb9A2DjfTV9%2Fimage.png?alt=media&#x26;token=4edd02b7-9113-419a-b824-66a8eaf488c7" alt=""><figcaption></figcaption></figure>

* Create a new project and select C++ as project template

<figure><img src="https://1689566151-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fr7ZiGN2LM1O6jHUxXhof%2Fuploads%2FqPhr3isrUL9UkD2NaCEH%2Fimage.png?alt=media&#x26;token=d4633e56-4355-4a19-937c-663cc9bc3dca" alt=""><figcaption></figcaption></figure>

* Close the editor and open the folder where the Project is located (e.g., `C:\UnrealEngine\SampleProject`
* Create a new `Plugins` folder at the root directory

<figure><img src="https://1689566151-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fr7ZiGN2LM1O6jHUxXhof%2Fuploads%2Fdn73l7sxVZhgFOJzq09v%2Fimage.png?alt=media&#x26;token=94129c13-1553-438b-8505-82ff2afaa18b" alt=""><figcaption></figcaption></figure>

* Copy your plugin within the `Plugins` directory

<figure><img src="https://1689566151-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fr7ZiGN2LM1O6jHUxXhof%2Fuploads%2FbJgp9TvGnn2KzSIWTqr9%2Fimage.png?alt=media&#x26;token=4ac7c4fd-5e65-490c-bb27-33d1aaa2a29c" alt=""><figcaption></figcaption></figure>

* Right-click `.uproject` file located at the root and select `Generate Visual Studio project files`

<figure><img src="https://1689566151-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fr7ZiGN2LM1O6jHUxXhof%2Fuploads%2FG87P7FeYiEIGfZHQjLqs%2Fimage.png?alt=media&#x26;token=976ab6e7-3325-46c7-b3c2-68a9a796f6c6" alt=""><figcaption></figcaption></figure>

* Double-click `.sln` file and open the project solution with your C++ IDE (Rider or Visual Studio)
* Open the file located under `Source/<ProjectName>/<ProjectName>.build.cs`

<figure><img src="https://1689566151-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fr7ZiGN2LM1O6jHUxXhof%2Fuploads%2FL7vqdHUfqRBUeh8UVSSP%2Fimage.png?alt=media&#x26;token=5a6cba2d-8370-4f97-b6ad-f054529aae20" alt=""><figcaption></figcaption></figure>

* Addj to `PublicDependencyModuleNames` the plugin module name you want to use in C++. In our case the module we want to use is `Foundation`

<figure><img src="https://1689566151-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fr7ZiGN2LM1O6jHUxXhof%2Fuploads%2F4ZXrW273O8BDlJ9DcunC%2Fimage.png?alt=media&#x26;token=854a8015-735d-4605-949d-97bd016b6c1f" alt=""><figcaption></figcaption></figure>

<figure><img src="https://1689566151-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fr7ZiGN2LM1O6jHUxXhof%2Fuploads%2F5gB3loESeGx4hNNs0i3v%2Fimage.png?alt=media&#x26;token=b22e3908-64d1-4d3c-99b6-a14db947ea11" alt=""><figcaption></figcaption></figure>

* Open the `.uproject` file

<figure><img src="https://1689566151-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fr7ZiGN2LM1O6jHUxXhof%2Fuploads%2FMKCrAiwgggMWxDRW0fjC%2Fimage.png?alt=media&#x26;token=9678de9d-bf07-4a8f-91ce-fee01d503c33" alt=""><figcaption></figcaption></figure>

* Add the plugin name you want to use for your project

<figure><img src="https://1689566151-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fr7ZiGN2LM1O6jHUxXhof%2Fuploads%2FZD4Gxzjht4rt5tgg1qcp%2Fimage.png?alt=media&#x26;token=0837cd37-4880-4e78-ad89-101eaf5479e5" alt=""><figcaption></figcaption></figure>

* Close your IDE and generate project files again. Right-click `.uproject` file on the root directory and `select Generate Visual Studio project files`
* Open your project solution `.sln`
* You can now start using your plugin in C++
