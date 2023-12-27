import type { UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';
import { Upload } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { useMutation, useQuery } from '@apollo/client';
import { GET_OSS_INFO, OSS_DEL } from '@/graphql/oss';

interface OSSDataType {
  dir: string;
  expire: string;
  host: string;
  accessid: string;
  policy: string;
  signature: string;
}

interface OSSUploadProps {
  value?: UploadFile[];
  label?: string;
  maxCount?: number;
  imgCropAspect?: number;
  onChange?: (files: UploadFile[]) => void;
}

const OSSImageUpload = ({
  label,
  maxCount,
  imgCropAspect,
  value,
  onChange,
}: OSSUploadProps) => {
  const { data, refetch } = useQuery<{ getOSSInfo: OSSDataType }>(GET_OSS_INFO);

  const OSSData = data?.getOSSInfo;

  const getKey = (file: UploadFile) => {
    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    const key = `${OSSData?.dir}${file.uid}${suffix}`;
    const url = `${OSSData?.host}/${key}`;
    return { key, url };
  };

  const handleChange: UploadProps['onChange'] = ({ fileList }) => {
    const files = fileList.map((f) => ({
      ...f,
      url: f.url || getKey(f).url,
    }));
    onChange?.(files);
  };

  const getExtraData: UploadProps['data'] = (file) => ({
    key: getKey(file).key,
    OSSAccessKeyId: OSSData?.accessid,
    policy: OSSData?.policy,
    Signature: OSSData?.signature,
  });

  const beforeUpload: UploadProps['beforeUpload'] = async (file) => {
    if (!OSSData) return false;

    const expire = Number(OSSData.expire) * 1000;

    if (expire < Date.now()) {
      await refetch();
    }
    return file;
  };

  const [run, { loading: delLoading }] = useMutation(OSS_DEL);

  const handleRemove: UploadProps['onRemove'] = async (file) => {
    console.log('file', file);
    console.log('delLoading-begin', delLoading);
    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    const res = await run({
      variables: {
        fileName: `${OSSData?.dir}${file.uid}${suffix}`,
      },
    });
    console.log('delLoading-end', delLoading);
    console.log('res', res);
  };

  return (
    <ImgCrop rotationSlider aspect={imgCropAspect}>
      <Upload
        name="file"
        maxCount={maxCount}
        listType="picture-card"
        fileList={value}
        action={OSSData?.host}
        onChange={handleChange}
        data={getExtraData}
        beforeUpload={beforeUpload}
        onRemove={handleRemove}
      >
        {label}
      </Upload>
    </ImgCrop>
  );
};
OSSImageUpload.defaultProps = {
  label: '上传图片',
  value: null,
  onChange: () => {},
  maxCount: 1,
  imgCropAspect: 1 / 1,
};
export default OSSImageUpload;
