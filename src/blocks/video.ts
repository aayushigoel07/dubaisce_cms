import type { Block } from 'payload';

export const VideoBlock: Block = {
  slug: 'video',
  labels: {
    singular: 'Video Block',
    plural: 'Video Blocks',
  },
  fields: [
    {
        name: 'title',
        label: 'Title',
        type: 'text',
        localized: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'richText',
      localized: true,
    },
    {
      name: 'videoSource',
      label: 'Video Source',
      type: 'radio',
      defaultValue: 'upload',
      options: [
        {
          label: 'Upload Video',
          value: 'upload',
        },
        {
          label: 'YouTube URL',
          value: 'youtube',
        },
      ],
    },
    {
      name: 'video',
      label: 'Video',
      type: 'upload',
      relationTo: 'media',
      localized: true,
      admin: {
        condition: (_, siblingData) => siblingData?.videoSource === 'upload',
        description: 'Upload a video file when Video Source is Upload Video.',
      },
      validate: (value: unknown, { siblingData }: { siblingData?: { videoSource?: string } }) => {
        if (siblingData?.videoSource === 'upload' && !value) {
          return 'Please upload a video.'
        }

        return true
      },
    },
    {
      name: 'youtubeUrl',
      label: 'YouTube URL',
      type: 'text',
      localized: true,
      admin: {
        condition: (_, siblingData) => siblingData?.videoSource === 'youtube',
        description: 'Paste a YouTube link, e.g. https://www.youtube.com/watch?v=... or https://youtu.be/...',
      },
      validate: (value: unknown, { siblingData }: { siblingData?: { videoSource?: string } }) => {
        if (siblingData?.videoSource !== 'youtube') {
          return true
        }

        if (!value) {
          return 'Please enter a YouTube URL.'
        }

        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[A-Za-z0-9_-]{6,}/i
        return youtubeRegex.test(String(value)) || 'Enter a valid YouTube URL.'
      },
    },
    {
      name: 'sideline',
      label: 'Caption',
      type: 'richText',
      localized: true,
    }
  ],
};