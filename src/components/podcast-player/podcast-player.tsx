import Script from 'next/script';

interface IProps {
    podcastFileUrl: string;
}
const PodcastPlayer: React.FunctionComponent<IProps> = ({ podcastFileUrl }) => {
    const casted_slug_url =
        'https://podcasts.mongodb.com/embed/v2/regularPlayer/' +
        podcastFileUrl +
        '/takeaways/guests/transcript/resources/subscribe';
    const casted_slug_id = 'casted-embed-' + podcastFileUrl;
    return (
        <div>
            <iframe
                width="100%"
                height="215px"
                id={casted_slug_id}
                scrolling="no"
                style={{ border: 'none', background: '#000' }}
                src={casted_slug_url}
            />
            <Script
                id="castedscr"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                      window.addEventListener("message", function(message){if(message.origin === "https://podcasts.mongodb.com" ) { if( message.data.event) { if(message.data.event === "castedSizeUpdate") { var casted_episode_player = document.getElementById('casted-embed-' + message.data.payload.slug); if(casted_episode_player) { casted_episode_player.height = message.data.payload.height;if(casted_episode_player.contentWindow) {casted_episode_player.contentWindow.postMessage({ event: "castedStopUpdate" }, "https://podcasts.mongodb.com");}}}}}}, false)
                    `,
                }}
            />
        </div>
    );
};

export default PodcastPlayer;
